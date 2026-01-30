const TableLoader = ({ columns = 3 }) => {
    return (
        <tr>
            <td colSpan={columns} style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div className="spinner"></div>
                    <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', margin: 0 }}>
                        Loading data...
                    </p>
                </div>
            </td>
        </tr>
    );
};

export default TableLoader;
