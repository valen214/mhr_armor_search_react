

log.info("[Export Default Data] initializing...")

local ARMOR_ID_TYPE = 2
local TALISMAN_ID_TYPE = 3

-- https://stackoverflow.com/a/27028488/3142238
function json_dump(o)
  if type(o) == 'table' then
     local s = ''
     for k,v in pairs(o) do
        if type(k) ~= 'number' then k = '"'..k..'"' end
        s = s ..k..':' .. json_dump(v) .. ', '
     end
     return '{ ' .. string.sub(s, 1, -3) .. ' }'
  else
     return tostring(o)
  end
end


local _log = function(str)
  log.debug("[Export Default Data] " .. tostring(str or ""));
end;

local DataShortcut = sdk.find_type_definition("snow.data.DataShortcut");
local getSkillName = DataShortcut:get_method("getName(snow.data.DataDef.PlEquipSkillId)");


--[[

  armorData: snow.data.ArmorData

    armorData:call("get_AllDecoSlotList"):call("get_Item", 0) returns
    snow.data.equip.param.DecorationSlotsData

    armorData:call("get_AllSkillDataList")
      returns snow.data.PlSkillData


      
    local skillData = allSkillDataList:call("get_Item", i || 0);
      _log(
        tostring(skillData:call("get_EquipSkillId")) .. " " ..
        tostring(skillData:call("get_Name")) .. " " ..
        tostring(skillData:call("get_TotalLv")) .. " " ..
        tostring(skillData:call("get_EffectiveLv")) .. " " ..
        tostring(skillData:call("get_MaxLv"))
      );

--]]


local snow_data_ArmorData_toobject = function(armorData)
  -- local isArmor = item:call("isArmor")
  -- _log(tostring(isArmor));
  -- _log(tostring(item:call("getName")))
  -- _log(tostring(item:call("getArmorData")))

  local allDecoSlotList = armorData:call("get_AllDecoSlotList");
  local allSkillDataList = armorData:call("get_AllSkillDataList");

  local skillObject = {}
  local skillIdObject = {}

  local hasSkill = false

  local count = allSkillDataList:call("get_Count")
  for i = 0,count-1,1 do
    local skillData = allSkillDataList:call("get_Item", i);
    if skillData:call("get_EquipSkillId") ~= 0 then
      hasSkill = true
      skillObject[skillData:call("get_Name")] = skillData:call("get_TotalLv")
      skillIdObject[skillData:call("get_EquipSkillId")] = skillData:call("get_TotalLv")
    end
  end

  local outputObj = {}
  outputObj["name"] = armorData:call("getName");
  outputObj["slots"] = {}
  for i = 0,2,1 do
    outputObj["slots"][i] = allDecoSlotList:call("get_Item", i):call("getSlotLv")
  end
  outputObj["skills"] = skillObject
  outputObj["skills_id"] = json_dump(skillIdObject)

  outputObj["hasSkill"] = hasSkill
  outputObj["isExSeries"] = armorData:call("isExSeries");
  outputObj["getSlotNum"] = armorData:call("getSlotNum");
  outputObj["get_DefaultSkillNum"] = armorData:call("get_DefaultSkillNum");
  -- outputObj["isValid"] = armorData:call("isValid");
  -- outputObj["isEnableCustom"] = armorData:call("isEnableCustom");

  return outputObj

  -- tostring(item:call("get_BuildupPoint"))
end


--[[
managed singleton: snow.data.ContentsIdDataManager

snow.data.ContentsIdDataManager
  getArmorSeriesData: snow.data.ArmorSeriesData[]
  getBaseData(snow.equip.DecorationsId): snow.data.DecorationBaseData


snow.data.ArmorSeriesData
  get_SeriesName
  get_ArmorIdList
  get_ExArmorIdList
  getArmorData(snow.data.ArmorData.PartsTypes, boolean): snow.data.ArmorData

?:
snow.data.ArmorProductSeriesData


local DataManager = sdk.get_managed_singleton("snow.data.DataManager");
if not DataManager then
  log.debug("DataManager is empty!");
end

local ContentsIdDataManager = sdk.get_managed_singleton("snow.data.ContentsIdDataManager");

local ArmorSeriesDataArray = ContentsIdDataManager:call("getArmorSeriesData")
local count = ArmorSeriesDataArray:call("get_Count");
for i = 0,count-1,1 do
  if i < 10 then
    local ArmorSeriesData = ArmorSeriesDataArray:call("get_Item", i);
    _log(ArmorSeriesData:call("get_SeriesName"))

    
    for part=0,4,1 do
      snow_data_ArmorData_tostring(ArmorSeriesData:call("getArmorData", part, true))
      snow_data_ArmorData_tostring(ArmorSeriesData:call("getArmorData", part, false))
    end
    _log(ArmorSeriesData:call("get_ArmorIdList"):call("get_Count"))
    _log(ArmorSeriesData:call("get_ExArmorIdList"):call("get_Count"))
  end
end
]]--


-- DataShortcut do all the work
;(function()
  local DataShortcut = sdk.find_type_definition("snow.data.DataShortcut");
  local getArmorIdNum = DataShortcut:get_method("getArmorIdNum(snow.data.ArmorData.PartsTypes)");

  local getArmorId = DataShortcut:get_method(
    "getArmorId(System.Int32, snow.data.ArmorData.PartsTypes)"
  ); -- return snow.data.DataDef.PlArmorId

  local getArmorData = DataShortcut:get_method(
    "getArmorData(snow.data.DataDef.PlArmorId)"
  ); -- return snow.data.ArmorData

  local isValid = DataShortcut:get_method(
    "isValid(snow.data.DataDef.PlArmorId)"
  ); -- return System.Boolean

  local outputArmorDataList = {}

  for part=0,4,1 do
    local partCount = getArmorIdNum:call(nil, part);
    for i=0,partCount-1,1 do
      local PlArmorId = getArmorId:call(nil, i, part);

      if isValid:call(nil, PlArmorId) then

        local ArmorData = getArmorData:call(nil, PlArmorId);
        local armorDataObj = snow_data_ArmorData_toobject(ArmorData);
        if armorDataObj["hasSkill"] or armorDataObj["getSlotNum"] ~= 0 then
          outputArmorDataList[tostring(PlArmorId)] = armorDataObj;
        end;
      end;

      -- _log(snow_data_ArmorData_tostring(getArmorData:call(nil, PlArmorId)));
    end
  end

  local outputSkillList = {}
  local getSkillName = DataShortcut:get_method("getName(snow.data.DataDef.PlEquipSkillId)");
  local getSkillMaxLv = DataShortcut:get_method("getMaxLv(snow.data.DataDef.PlEquipSkillId)");
  local isSkillValid = DataShortcut:get_method("isValid(snow.data.DataDef.PlEquipSkillId)");
  for i=0,255,1 do
    local skillId = tostring(i);
    local outputSkill = {}
    if isSkillValid:call(nil, i) then
      outputSkill["name"] = getSkillName:call(nil, i);
      outputSkill["maxLv"] = getSkillMaxLv:call(nil, i);

      if outputSkill["name"] ~= "" then
        outputSkillList[skillId] = outputSkill;
      end;
    end;

  end

  local ContentsIdDataManager = sdk.get_managed_singleton("snow.data.ContentsIdDataManager");
  -- _log(ContentsIdDataManager:get_method("getBaseData(snow.equip.DecorationsId)"))

  local outputDecoList = {}
  
  local getDecorationIdMaxNum = DataShortcut:get_method("getDecorationIdMaxNum()");
  -- local getDecorationIdNum = DataShortcut:get_method("getDecorationIdNum()");
  local DecorationIdMaxNum = getDecorationIdMaxNum:call(nil);
  for i=1,DecorationIdMaxNum,1 do
    local DecorationBaseData = ContentsIdDataManager:call(
      "getBaseData(snow.equip.DecorationsId)", i
    ); -- return snow.data.DecorationBaseData

    local decoData = {}
    if DecorationBaseData then
      decoData["name"] = DecorationBaseData:call("get_Name()")
      decoData["decoLv"] = DecorationBaseData:call("get_DecorationLv()")
      decoData["skills"] = {}
      local skills_id = {}

      -- snow.data.DataDef.PlEquipSkillId[]
      local PlEquipSkillIdList = DecorationBaseData:call("get_SkillIdList()");
      local SkillLvList = DecorationBaseData:call("get_SkillLvList()");

      local hasSkill = false;
      local skillCount = PlEquipSkillIdList:call("get_Count")
      for i = 0,skillCount-1,1 do
        local PlEquipSkillId = PlEquipSkillIdList:call("get_Item", i);
        if isSkillValid:call(nil, PlEquipSkillId) then
          local skillLv = SkillLvList:call("get_Item", i);
          decoData["skills"][getSkillName:call(nil, PlEquipSkillId)] = skillLv;
          skills_id[PlEquipSkillId] = skillLv;
          hasSkill = true;
        end
      end

      decoData["skills_id"] = json_dump(skills_id)

      outputDecoList[tostring(i)] = decoData;
    end



  end


  

  local json_output = {}
  json_output["armors"] = outputArmorDataList
  json_output["skills"] = outputSkillList
  json_output["decos"] = outputDecoList
  json.dump_file("default_data.json", json_output, 2)
end)();

log.info("[Export Default Data] initialized.")