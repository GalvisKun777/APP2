export class TimerService {
    private intervalId: ReturnType<typeof setInterval> | null = null;
    private duration: number;
    private onTick?: (timeLeft: number) => void;
    private onFinish?: () => void;
    private timeLeft: number;

    constructor(
        duration: number,
        onTick?: (timeLeft: number) => void,
        onFinish?: () => void
    ) {
        this.duration = duration;
        this.timeLeft = duration;
        this.onTick = onTick;
        this.onFinish = onFinish;
    }

    public start(): void {
        if (this.intervalId) return;

        // Initial tick
        if (this.onTick) this.onTick(this.timeLeft);

        this.intervalId = setInterval(() => {
            this.timeLeft--;

            if (this.onTick) this.onTick(this.timeLeft);

            if (this.timeLeft <= 0) {
                this.stop();
                if (this.onFinish) this.onFinish();
            }
        }, 1000);
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public reset(): void {
        this.stop();
        this.timeLeft = this.duration;
        if (this.onTick) this.onTick(this.timeLeft);
    }
}
