FROM python:3-alpine

RUN apk add py-pip
RUN apk add --no-cache python3-dev
RUN pip install --upgrade pip
WORKDIR /app
EXPOSE 5000
COPY . /app
RUN pip --no-cache-dir install -r requirement.txt
CMD [ "waitress-serve","--listen=0.0.0.0:5000", "app:app" ]