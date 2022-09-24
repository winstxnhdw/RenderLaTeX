from os import environ as env

from dotenv import load_dotenv
from requests import post


def main():

    load_dotenv()
    api_key = env.get("TWITTER_API_KEY")
    
    developer_url = f"https://twitter.com/oauth/request_token?oauth_consumer_key={api_key}&oauth_callback=oob"
    print(f"Log into your developer account, and visit this URL:\n{developer_url}")

    oauth_token = input("Enter the OAuth token: ")
    bot_url = f"https://twitter.com/oauth/authenticate?oauth_token={oauth_token}"
    print(f"Now login to your bot account, and visit this URL:\n{bot_url}")

    pin = input("Enter the PIN: ")
    response = post(f"https://twitter.com/oauth/access_token?oauth_token={oauth_token}&oauth_verifier={pin}")
    
    [print(token) for token in response.text.split("&")[0:2]]

if __name__ == '__main__':
    main()