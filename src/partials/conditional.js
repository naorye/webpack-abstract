const noop = () => {};

export function conditional(condition, thenHandler = noop, elseHandler = noop) {
    return condition ? thenHandler : elseHandler;
}
