class Pipeline
{
    constructor(passable, pipes) {
        this.passable = passable;
        this.pipes = pipes;

        this.pipeOrder = [];
        for (let key in pipes) {
            this.pipeOrder.push(key);
        }
    }

    send(passable) {
        this.passable = passable;
        return this;
    }

    through(pipes) {
        this.pipes = pipes;
        this.pipeOrder = [];
        for (let key in pipes) {
            this.pipeOrder.push(key);
        }

        return this;
    }

    then(destination) {
        let pipeline = this.pipeOrder.reverse().reduce(this.carry(), this.prepareDestination(destination))
        pipeline(this.passable)
    }

    carry() {
        return (stack, pipe) => {
            return (passable) => this.pipes[pipe](passable, stack);
        }
    }

    prepareDestination(destination) {
        return (passable) => {
            return destination(passable)
        }
    }
}

export {Pipeline}