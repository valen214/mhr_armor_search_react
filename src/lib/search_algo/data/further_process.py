
# chcp 65001

"""
py further_process.py ..\..\..\..\public\lang\skills_zh.csv

"""


import json
import sys

def main():
    if len(sys.argv) < 2:
        print("missing output file")
        print("expect first argument to be skills_zh.csv path")
        return

    with open("default_data.json", encoding="utf-8") as f:
        read_data = f.read()

    default_data = json.loads(read_data)

    skills = default_data.get("skills")

    with open(sys.argv[1], "w", encoding="utf-8") as f:
        f.write("0,None,0\n")

        for item in sorted(
            skills.items(),
            key=lambda item: int(item[0])
        ):
            id = item[0]
            name = item[1]["name"]
            maxLv = item[1]["maxLv"]
            f.write(f"{id},{name},{maxLv}\n")

    decos = default_data.get("decos")
    

if __name__ == "__main__":
    main()