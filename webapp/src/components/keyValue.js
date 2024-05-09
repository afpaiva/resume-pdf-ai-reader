export const KeyValue = (props) => {
    return (
        !!props.value &&
        <div className='values'>
            <div className='key'>{props.keyValue}</div>
            <div className='value'>{props.value}</div>
        </div>
    )
}