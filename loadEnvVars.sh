# Load environment variables into apiGoogleconfig.json to make use of react-google-calendar-api
sed "s/GOOGLE_CALENDAR_CLIENT_ID/$GOOGLE_CALENDAR_CLIENT_ID/g; s/GOOGLE_CALENDAR_API_KEY/$GOOGLE_CALENDAR_API_KEY/g" apiGoogleconfigTemplate.json > apiGoogleconfig.json;
