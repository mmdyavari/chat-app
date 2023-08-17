# convert unix time (javascript and python)
def unix_converter (unix_time):
    if "." in str(unix_time):
        to_str = str(unix_time).replace('.', '')
        return int(to_str)
    else:
        return unix_time/1000
        

if __name__ == "__main__":
    print(unix_converter(1692279143.009), "python to js")
    print(unix_converter(1692279143009), "js to python")
