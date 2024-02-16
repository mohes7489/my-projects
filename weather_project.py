import sys
import requests


api_key = "e76eda825f2b73c135da66384e41e331"
base_URL = "http://api.openweathermap.org/data/2.5/weather"

city = input("Enter a city name: ")
request_url = f"{base_URL}?appid={api_key}&q={city}"

response = requests.get(request_url)
data = response.json()
weather = data['weather'][0]['description']
print("the weather is:", weather, file=sys.stderr)
tempreture = round(data['main']['temp'] - 273.15, 2)
print("the temperature", tempreture, file=sys.stderr)
feels_like = round(data['main']['feels_like'] - 273.15, 2)
print("it feels like:", feels_like, file=sys.stderr)
