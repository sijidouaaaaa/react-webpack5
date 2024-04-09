import Mock from 'mockjs';

const chanceTypes = [];
const users = [];
const managerGroupData = []
const managerData = []

const chanceTypeNames = ['商标', '案件', '交易', '版权', '专利'];
for (let i = 0; i < 5; i++) {
  chanceTypes.push(Mock.mock({
    chanceId: Mock.Random.guid(),
    chanceName: chanceTypeNames[i]
  }));
}

for (let i = 0; i < 86; i++) {
  users.push(Mock.mock({
    userId: i+1,
    userName: Mock.Random.cname(),
    gender: Mock.Random.integer(0, 1),
    email:  Mock.Random.integer(1000, 10000) + '@qq.com',
    birthDate: Mock.Random.date()
  }));
}

for (let i = 0; i < 20; i += 1) {
  managerGroupData.push(Mock.mock({
    name: `group${i}`,
    groupId: i + 1,
    child:  [],
  }));
}

for (let i = 0; i < 20; i += 1) {
  managerData.push(Mock.mock({
    userId: i,
    name: `manager${i}`,
    managerId: i,
  }));
}

export { chanceTypes, users, managerGroupData, managerData };
