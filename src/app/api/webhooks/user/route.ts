import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import PocketBase from 'pocketbase';

const pb = new PocketBase("https://mediassistdb.hop.sh");

const handler = async (req: Request) => {
    console.log("Request received");
    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new SVIX instance with the webhook secret
    const webhookSecret = process.env.WEBHOOK_SECRET;

    if (!webhookSecret) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    // Handling events (call APIs to update database)
   if (evt.type  === "user.created") {
    const { id, email_addresses, ...attributes } = evt.data;
    const email_address = email_addresses[0].email_address;

        
        let data = {
            "custID": id,
            "email": email_address,
        }

        let record = await pb.collection('customer').create(data);

        console.log(record);

   } else if (evt.type === "user.deleted") {
        let { id, ...attributes } = evt.data;

        // Get id first
        console.log("new");
        console.log(`custID=${id}"`);
        const pbID = await pb.collection('customer').getFirstListItem(`custID="${id}"`);

        console.log(pbID);

        // Delete record
        await pb.collection('customer').delete(pbID.id);
   }

   return new Response('Success', {status:200} );

}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;