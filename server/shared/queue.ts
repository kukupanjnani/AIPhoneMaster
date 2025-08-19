import { Queue } from 'bullmq';
export const jobQueue = new Queue('jobs');
export function scheduleJob(name: string, data: any) {
  return jobQueue.add(name, data);
}
