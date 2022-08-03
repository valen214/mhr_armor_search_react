
import os

def importSkillsFromCSV(filename):
    out = dict()
    with open(filename, mode="r", encoding="utf-8") as f:
        for l in f.readlines():
            a = l.split(',')
            if len(a) >= 2:
                out[a[0].strip()] = a[1].strip()
    return out

def categories(skills):
    a = map(
        lambda l: (
            len(l.strip()) and int(getName(skills, l.strip()))
        ),
        """
雷紋一致
風紋一致
霞皮之恩惠
鋼殼之恩惠
炎鱗之恩惠
風雷合一
        """.split("\n")
    )
    print(list(filter(bool, a)))

def getName(skills, skillname):
    return getKeyByValue(skills, skillname)


# https://stackoverflow.com/a/13149770/3142238
def getKeyByValue(mydict, value):
    return list(mydict.keys())[list(mydict.values()).index(value)]
    

if __name__ == "__main__":
    skills = importSkillsFromCSV("skills_zh.csv")
    categories(skills)
    
    