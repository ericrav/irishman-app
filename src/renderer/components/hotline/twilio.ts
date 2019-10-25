import { jwt } from 'twilio';
import { Device } from 'twilio-client';

const ClientCapability = jwt.ClientCapability;

const accountSid = process.env.ELECTRON_WEBPACK_APP_TWILIO_ACCOUNT_SID!;
const authToken = process.env.ELECTRON_WEBPACK_APP_TWILIO_AUTH_TOKEN!;

// put your Twilio Application Sid here
const appSid = process.env.ELECTRON_WEBPACK_APP_TWILIO_APP_SID!;

console.log({ accountSid, authToken, appSid });

const capability = new ClientCapability({
  accountSid: accountSid,
  authToken: authToken,
  ttl: 0,
});
capability.addScope(new ClientCapability.OutgoingClientScope({ applicationSid: appSid }));
const token = capability.toJwt();

const device = new Device();
device.setup(token);

export function makeCall() {
  return device.connect({ To: process.env.ELECTRON_WEBPACK_APP_PHONE_NUMBER });
}