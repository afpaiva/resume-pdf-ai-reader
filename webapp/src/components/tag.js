export const Tag = (props) => {
    const styles = {
        padding: "10px",
        backgroundColor: "rgb(43, 43, 196)",
        borderRadius: "15px",
        color: "white",
        fontWeight: "bolder",
        fontSize: "14px"
    }

    return <div style={styles}>{props.label}</div>
}