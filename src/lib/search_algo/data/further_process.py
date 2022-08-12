
# chcp 65001

"""
py further_process.py ..\..\..\..\public\lang\skills_zh.csv .\decos.json nope

"""


import json
import re
import sys

def main():
    if len(sys.argv) < 3:
        print("missing output files")
        print("expect first argument to be skills_zh.csv path")
        print("expect second argument to be decos.json path")
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
    with open(sys.argv[2], "w", encoding="utf-8") as f:
        decos = dict(sorted(
            decos.items(),
            key=lambda item: int(item[0])
        ))
        for key in decos.keys():
            decos[key]["skills_id"] = (
                json.loads(re.sub(
                    r"(\d+):",
                    r'"\1":',
                    decos[key]["skills_id"]
                ))
            )
        f.write(json.dumps(decos, indent=2, ensure_ascii=False))
        # id = item[0]
        # name = item[1]["name"]
        # maxLv = item[1]["maxLv"]
        # f.write(f"{id},{name},{maxLv}\n")

    armors = default_data.get("armors")
    with open(sys.argv[3], "w", encoding="utf-8") as f:
        pass
    

if __name__ == "__main__":
    main()