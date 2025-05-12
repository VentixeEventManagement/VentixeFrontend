
const SvgIcon = ({ imageUrl, className = "", fill = "", width = "24", height = "24", ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill={fill} width={width} height={height} {...props}>
        {imageUrl && (
            <image href={imageUrl} x="0" y="0" width={width} height={height} preserveAspectRatio="xMidYMid" />
        )}
        {props.children}
    </svg>
);

export default SvgIcon;