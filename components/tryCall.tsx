import { ValidationError } from "runtypes";

export const tryCall = (toCall: () => any) => {
    try {
        return <code><pre>{JSON.stringify(toCall(), null, 2)}</pre></code>
    } catch(e) {
        console.log({ e });
        return (
            <code style={ { color: "red" }}>
                <pre>
                    {(e instanceof Error) ? e.toString() : 'Unknown Error'}
                </pre>
                {(e instanceof ValidationError) ? (
                    <pre>{JSON.stringify(e.details, null, 2)}</pre>
                ) : null}
            </code>
        )
    }
}