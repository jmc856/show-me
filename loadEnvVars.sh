sed "s/GOOGLE_CALENDAR_CLIENT_ID/$GOOGLE_CALENDAR_CLIENT_ID/g" apiGoogleconfig.json > apiGoogleconfig2.json ; mv apiGoogleconfig2.json apiGoogleconfig.json && sed "s/GOOGLE_CALENDAR_API_KEY/$GOOGLE_CALENDAR_API_KEY/g" apiGoogleconfig.json > apiGoogleconfig2.json ; mv apiGoogleconfig2.json apiGoogleconfig.json
