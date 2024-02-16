import random
import string
import sys


def generate_password(min_length, numbers=True, special_characters=True):
    num = string.digits
    letters = string.ascii_letters
    special = string.punctuation

    all_char = letters
    if numbers:
        all_char += num

    if special_characters:
        all_char += special
    # print(num, letters, special)
    # print(all_char)
    pwd = ""

    while len(pwd) < min_length:
        new_char = random.choice(all_char)
        pwd += new_char

    return pwd


minimum = int(input("what is the minimum length for your pwd: "))
password = generate_password(minimum)
print("your password is:", password, file=sys.stderr)

