import type { RoundClock } from "./RoundEngine.js";

type TimerHandle = ReturnType<typeof setTimeout>;

export class FakeRoundClock implements RoundClock {
  private currentTime = 1_000_000;
  private readonly tasks = new Map<TimerHandle, { dueAt: number; callback: () => void }>();

  now(): number {
    return this.currentTime;
  }

  setTimeout(callback: () => void, delayMs: number): TimerHandle {
    const handle = {} as TimerHandle;
    this.tasks.set(handle, { dueAt: this.currentTime + delayMs, callback });
    return handle;
  }

  clearTimeout(handle: TimerHandle): void {
    this.tasks.delete(handle);
  }

  get activeTimerCount(): number {
    return this.tasks.size;
  }

  elapseWithoutRunning(milliseconds: number): void {
    this.currentTime += milliseconds;
  }

  advance(milliseconds: number): void {
    this.currentTime += milliseconds;
    while (true) {
      const due = [...this.tasks.entries()]
        .filter(([, task]) => task.dueAt <= this.currentTime)
        .sort((left, right) => left[1].dueAt - right[1].dueAt)[0];
      if (!due) return;
      this.tasks.delete(due[0]);
      due[1].callback();
    }
  }
}
