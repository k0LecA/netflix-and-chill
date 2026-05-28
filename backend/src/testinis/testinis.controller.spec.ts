import { Test, TestingModule } from '@nestjs/testing';
import { TestinisController } from './testinis.controller';

describe('TestinisController', () => {
  let controller: TestinisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestinisController],
    }).compile();

    controller = module.get<TestinisController>(TestinisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
