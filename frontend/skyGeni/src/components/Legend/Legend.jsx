

const Legend = ({ collerPalette }) => {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
            {Object.entries(collerPalette).map(([key, color]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", marginRight: "15px", marginBottom: "5px" }}>
                    <div
                        style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: color,
                            marginRight: "6px",
                            borderRadius: "2px"
                        }}
                    />
                    <span style={{ fontSize: "12px", color: "#333" }}>{key}</span>
                </div>
            ))}
        </div>
    );
};

export default Legend;