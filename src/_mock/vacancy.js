import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------
const ids = ['b123456', 'b234567', 'b345678', 'b456789', 'b567890', 'b678901', 'b789012'];

export const vacancy = [...Array(7)].map((_, index) => {
  const count1 = Math.floor(Math.random() * 10) + 1;
  const count2 = Math.floor(Math.random() * 10) + 1;
  const count3 = Math.floor(Math.random() * 10) + 1;
  return {
    id: ids[index + 1],
    vacancyName: faker.person.jobType(),
    experience: faker.lorem.sentence(2),
    responsibility: [...Array(count1)].map((i) => ({
      value: faker.lorem.words({ min: 15, max: 40 }),
    })),
    requirement: [...Array(count2)].map((i) => ({
      value: faker.lorem.words({ min: 13, max: 25 }),
    })),
    condition: [...Array(count3)].map((i) => ({ value: faker.lorem.words({ min: 20, max: 30 }) })),
  };
});
