import { useState, useEffect } from 'react';
import api from '../api';
import { Filter, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import TableLoader from '../components/TableLoader';

const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [dateFilter, setDateFilter] = useState('');
    const [empFilter, setEmpFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const [selectedEmp, setSelectedEmp] = useState('');
    const [markDate, setMarkDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const load = async () => {
            try {
                setIsLoading(true);
                const [eRes, aRes] = await Promise.all([api.get('/employees/'), api.get('/attendance/')]);
                setEmployees(eRes.data);
                const sorted = aRes.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setAttendance(sorted);
                setFiltered(sorted);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load data");
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    useEffect(() => {
        let result = attendance;
        if (dateFilter) {
            result = result.filter(r => r.date === dateFilter);
        }
        if (empFilter) {
            result = result.filter(r => r.employee == empFilter);
        }
        setFiltered(result);
    }, [dateFilter, empFilter, attendance]);

    const handleMark = async (status) => {
        if (!selectedEmp) return toast.error("Select an employee first");
        try {
            await api.post('/attendance/', { employee: selectedEmp, date: markDate, status });
            toast.success(`Marked ${status}`);
            const res = await api.get('/attendance/');
            setAttendance(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        } catch (e) {
            toast.error(e.response?.data?.error || "Failed");
        }
    };

    const getEmpName = (id) => employees.find(e => e.id === id)?.full_name || 'Unknown';

    return (
        <div className="container">
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1>Attendance</h1>
                    <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Track daily presence and logs.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'white', padding: '0.25rem 0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                        <Filter size={14} color="var(--text-tertiary)" />
                        <select className="input" value={empFilter} onChange={e => setEmpFilter(e.target.value)} style={{ border: 'none', padding: 0, width: '150px', fontSize: '0.875rem' }}>
                            <option value="">All Employees</option>
                            {employees.map(e => <option key={e.id} value={e.id}>{e.full_name}</option>)}
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'white', padding: '0.25rem 0.5rem', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} style={{ border: 'none', fontSize: '0.875rem', outline: 'none' }} />
                        {dateFilter && <button onClick={() => setDateFilter('')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>&times;</button>}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
                {/* Left: Action Panel */}
                <div className="card" style={{ height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Log Attendance</h3>
                    <div className="form-group">
                        <label className="label">Date</label>
                        <input type="date" className="input" value={markDate} onChange={e => setMarkDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="label">Employee</label>
                        <select className="input" value={selectedEmp} onChange={e => setSelectedEmp(e.target.value)} size={5} style={{ height: 'auto', padding: '0.5rem' }}>
                            {employees.map(e => (
                                <option key={e.id} value={e.id} style={{ padding: '0.25rem' }}>{e.full_name}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <button className="btn btn-primary" onClick={() => handleMark('Present')} style={{ justifyContent: 'center', background: '#059669' }}>
                            <Check size={16} /> Present
                        </button>
                        <button className="btn btn-primary" onClick={() => handleMark('Absent')} style={{ justifyContent: 'center', background: '#dc2626' }}>
                            <X size={16} /> Absent
                        </button>
                    </div>
                </div>

                <div className="table-wrapper" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', position: 'relative' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Employee</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <TableLoader columns={3} />
                            ) : (
                                <>
                                    {filtered.map(r => (
                                        <tr key={r.id}>
                                            <td style={{ fontFamily: 'var(--font-mono)' }}>{r.date}</td>
                                            <td style={{ fontWeight: 500 }}>{getEmpName(r.employee)}</td>
                                            <td>
                                                <span className={`badge ${r.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>
                                                    <span className="badge-dot" /> {r.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr><td colSpan="3" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>No logs found.</td></tr>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
