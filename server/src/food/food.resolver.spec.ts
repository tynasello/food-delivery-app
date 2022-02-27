import { Test, TestingModule } from '@nestjs/testing';
import { FoodResolver } from './food.resolver';
import { FoodService } from './food.service';

describe('FoodResolver', () => {
  let resolver: FoodResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodResolver, FoodService],
    }).compile();

    resolver = module.get<FoodResolver>(FoodResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
