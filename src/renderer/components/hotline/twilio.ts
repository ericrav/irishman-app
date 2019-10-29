import { jwt } from 'twilio';
import { Device } from 'twilio-client';

const ClientCapability = jwt.ClientCapability;

const accountSid = process.env.ELECTRON_WEBPACK_APP_TWILIO_ACCOUNT_SID!;
const authToken = process.env.ELECTRON_WEBPACK_APP_TWILIO_AUTH_TOKEN!;

// put your Twilio Application Sid here
const appSid = process.env.ELECTRON_WEBPACK_APP_TWILIO_APP_SID!;

const capability = new ClientCapability({
  accountSid: accountSid,
  authToken: authToken,
  ttl: 0,
});
capability.addScope(new ClientCapability.OutgoingClientScope({ applicationSid: appSid }));
const token = capability.toJwt();

const device = new Device();
device.setup(token, { enableRingingState: true });

export function makeCall() {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const phoneNumber = isDevelopment ? process.env.ELECTRON_WEBPACK_APP_PHONE_NUMBER_DEV : process.env.ELECTRON_WEBPACK_APP_PHONE_NUMBER;
  return { device, connection: device.connect({ To: phoneNumber }) };
}
