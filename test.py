import redis
from datetime import datetime


ssl_ca_certs = 'config/redis_ca.pem'

if __name__ == '__main__':
    # r = redis.Redis(
    #     host='redis-14037.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
    #     port=14037,
    #     ssl=True,
    #     password='admin',
    #     ssl_ca_certs=ssl_ca_certs
    # )
    # print(r.ping())
    #if(not (test_str1 and test_str1.strip())):
    # with open('/Users/abhishek/apps/Work/test/Big_file/random_text_1_1MB.txt', 'r') as file:
    #     data = file.read().rstrip()
    #
    # r.set(data, "World!!!")
    # print(r.get(data))

    # date_str = "05/07/2024 09:15:00"
    # 2024-07-04 09:15:00
    # Define the format corresponding to the given date string
    #date_format = "%d/%m/%Y %H:%M:%S"
    date_format = "%Y-%m-%d %H:%M:%S"
    date_str = '2024-07-04 09:15:00'
    # Create a datetime object from the date string
    date_obj = datetime.strptime(date_str, date_format)
    print(date_obj.timestamp()*1000)
