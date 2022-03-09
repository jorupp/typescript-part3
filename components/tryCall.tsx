export const tryCall = (toCall: () => any) => {
    try {
        return <code><pre>{JSON.stringify(toCall(), null, 2)}</pre></code>
    } catch(e) {
        return (
            <code style={ { color: "red" }}>
                <pre>
                    {(e instanceof Error) ? e.toString() : 'Unknown Error'}
                </pre>
            </code>
        )
    }
}