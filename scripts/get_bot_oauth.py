from os import environ as env

from dotenv import load_dotenv
from requests import post


def main():

    load_dotenv()
    api_key = env.get("TWITTER_API_KEY")
    str_input = lambda prompt: str(input(prompt))
    
    developer_url = f"https://twitter.com/oauth/request_token?oauth_consumer_key={api_key}&oauth_callback=oob"
    print(f"[!] Login to your *DEVELOPER* account and visit this URL:\n{developer_url}")

    oauth_token = str_input("[?] Enter the OAuth token: ")
    bot_url = f"https://twitter.com/oauth/authenticate?oauth_token={oauth_token}"
    print(f"[!] Login to your *BOT* account and visit this URL:\n{bot_url}")

    pin = str_input("[?] Enter the PIN: ")
    response = post(f"https://twitter.com/oauth/access_token?oauth_token={oauth_token}&oauth_verifier={pin}")
    
    print("[*] Your OAuth tokens are:")
    [print(token) for token in response.text.split("&")[0:2]]

if __name__ == '__main__':
    main()