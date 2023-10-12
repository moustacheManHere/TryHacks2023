from flask import Flask, request, jsonify
import pandas as pd
import requests
from urllib.parse import quote_plus
import json
from bs4 import BeautifulSoup
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
drugsList = pd.read_csv("./druglist.csv")

def img2textfunc(url,img2txtAPI):

    base_url = "https://api.apilayer.com/image_to_text/url?url="
    sendURL = base_url + quote_plus(url)

    payload = {}
    headers= {
    "apikey": img2txtAPI
    }

    response = requests.request("GET", sendURL, headers=headers, data = payload)

    if response.status_code == 200:
        return response.text
    else:
        return 0
    
def file2url(base64_image,urlEncoderAPI):
    url = "https://freeimage.host/api/1/upload"

    params = {
        "key": urlEncoderAPI,
        "action": "upload",
        "source": base64_image,
        "format": "json"
    }

    response = requests.post(url, data=params)

    if response.status_code == 200:
        result = response.json()
        image_info = result.get("image", {})
        return image_info.get("url")
    else:
        return 0

def imgOCR(base64_image):
    
    urlEncoderAPI = "6d207e02198a847aa98d0a2a901485a5"
    img2txtAPI = "gdmaRGW1cVioFD0oX4RZxJvVX18IJJXc"

    url = file2url(base64_image,urlEncoderAPI)

    if(url == 0): 
        print("Error converting to URL")
        return 0
    text = img2textfunc(url,img2txtAPI)

    if (text == 0):
        print("Error reading image")
        return 0
    OCR_text = json.loads(text)["annotations"]    
    OCR_text = [word for word in OCR_text if len(word) >= 3]
    return OCR_text

def drugSearch(arr):
    arr = [x.lower() for x in arr]
    res = drugsList.loc[drugsList["name"].isin(arr)]
    if(res.empty):
        return 0
    else:
        record = res.iloc[0].tolist()
        return (record)

def detailScrap(id):
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/112.0'}
    res = requests.get(f"https://go.drugbank.com/drugs/{id}",headers=headers)
    if res.status_code != 200:
        return 0
    soup = BeautifulSoup(res.text)

    summary = soup.find('dt', class_='col-xl-2 col-md-3 col-sm-4', id='summary').find_next_sibling('dd').get_text(strip=True)
    background = soup.find('dt', class_='col-xl-2 col-md-3 col-sm-4', id='background').find_next_sibling('dd').get_text(strip=True)
    genName = soup.find('dd', class_='col-xl-4 col-md-9 col-sm-8 pr-xl-2').get_text(strip=True)
    foodInt = soup.find('dt', id='food-interactions').find_next_sibling('dd').get_text()

    response = {
        "summary" : summary,
        "background" : background,
        "genName" : genName,
        "foodInt" : foodInt
    }

    return response

@app.route("/")
def hello():
    return jsonify({"msg":"hello there"}), 200

@app.route("/details/<id>")
def getDetails(id):
    try:
        response = detailScrap(id)
        return jsonify(response), 200
    except:
        return jsonify({"msg":"not found"}), 404

@app.route("/upload",methods=["POST"])
def upload():
    data = request.get_json(force=True)
    img_str = data["image"]
    arr = imgOCR(img_str)
    if arr == 0:
        return jsonify({"msg":"internal error"}), 500
    name = drugSearch(arr)
    if name == 0:
        return jsonify({"msg":"not found"}), 404
    else:
        return jsonify({"name":name[1],"id":name[2]}), 200

port = int(os.environ.get("PORT",5000))
if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0",port=port)