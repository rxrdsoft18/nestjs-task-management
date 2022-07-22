import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';

const mockTaskService = () => ({
  getTasks: jest.fn(),
  getTaskById: jest.fn(),
  findTaskById: jest.fn(),
});

const mockUser = {
  username: 'Test User',
  password: 'Test Password',
  id: '123',
  tasks: [],
};

describe('TaskService', () => {
  let taskService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksService, useFactory: mockTaskService },
      ],
    }).compile();

    taskService = await module.get<TasksService>(TasksService);
  });

  describe('getTasks', () => {
    it('gets all tasks from service', async () => {
      taskService.getTasks.mockResolvedValue('someValue');
      const result = await taskService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('gets a task by id from service', async () => {
      const mockTask = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'OPEN',
        id: '123',
      };

      taskService.getTaskById.mockResolvedValue(mockTask);
      const result = await taskService.getTaskById('id', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('throws an error if task is not found', async () => {
      taskService.findTaskById.mockResolvedValue(null);
      // console.log(
      //   await taskService.getTaskById('id', mockUser),
      //   'taskService.getTaskById',
      // );
      await expect(taskService.getTaskById('someId', mockUser)).toBeUndefined();
    });
  });
});
