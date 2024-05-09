export const OutputJson = (props) => {
    const styles = {
        width: "500px",
        padding: "10px",
        backgroundColor: "rgb(39, 37, 34)",
        borderRadius: "15px",
        color: "white",
        fontSize: "12px",
        overflowX: "scroll",
        overflowY: "hidden"
    }

    return <pre style={styles}>{JSON.stringify(props.data, null, 2)}</pre>

}