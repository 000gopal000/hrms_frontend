import { useState, useEffect } from 'react';
import api from '../api';
import { Trash2, UserPlus, Users, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        employee_id: '',
        full_name: '',
        email: '',
        department: ''
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await api.get('/employees/');
            setEmployees(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load data");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this employee record?')) return;
        try {
            await api.delete(`/employees/${id}/`);
            toast.success('Record deleted');
            fetchEmployees();
        } catch (error) {
            toast.error('Deletion failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/employees/', formData);
            toast.success('Employee created');
            setShowModal(false);
            setFormData({ employee_id: '', full_name: '', email: '', department: '' });
            fetchEmployees();
        } catch (error) {
            toast.error('Failed. ID or Email must be unique.');
        }
    };

    const today = new Date().toISOString().split('T')[0];
    const presentToday = employees.filter(e => e.attendance_records?.some(a => a.date === today && a.status === 'Present')).length;
    const attendanceRate = employees.length ? Math.round((presentToday / employees.length) * 100) : 0;

    const filtered = employees.filter(emp =>
        emp.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1>Employees</h1>
                    <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Manage your workforce directory.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <UserPlus size={16} /> Add Employee
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <StatCard label="Total Employees" value={employees.length} icon={<Users size={18} />} />
                <StatCard label="Departments" value={[...new Set(employees.map(e => e.department))].length} icon={<Filter size={18} />} />
                <StatCard label="Attendance Today" value={`${attendanceRate}%`} icon={<div style={{ width: 8, height: 8, borderRadius: '50%', background: attendanceRate > 80 ? '#10b981' : '#f59e0b' }} />} />
            </div>

            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="card" style={{ width: '400px', padding: '1.5rem' }}>
                        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                            <h3>New Employee</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="label">Employee ID</label>
                                <input className="input" required value={formData.employee_id} onChange={e => setFormData({ ...formData, employee_id: e.target.value })} placeholder="EMP-000" autoFocus />
                            </div>
                            <div className="form-group">
                                <label className="label">Full Name</label>
                                <input className="input" required value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="label">Email</label>
                                <input className="input" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="label">Department</label>
                                <input className="input" required value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="table-wrapper" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 300px)', overflow: 'hidden' }}>
                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <Search size={14} color="var(--text-tertiary)" />
                    <input
                        style={{ border: 'none', fontSize: '0.875rem', outline: 'none', width: '100%' }}
                        placeholder="Filter by name or ID..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ overflowY: 'auto', flexGrow: 1 }}>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '120px' }}>ID</th>
                                <th>Employee</th>
                                <th>Department</th>
                                <th>Attendance</th>
                                <th style={{ width: '50px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(emp => (
                                <tr key={emp.employee_id}>
                                    <td className="col-id">{emp.employee_id}</td>
                                    <td>
                                        <div className="user-cell">
                                            <div className="table-avatar">
                                                {emp.full_name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="col-primary">{emp.full_name}</div>
                                                <div className="col-secondary">{emp.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="badge badge-neutral">{emp.department}</span></td>
                                    <td>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#059669' }}>
                                            {emp.attendance_records?.filter(a => a.status === 'Present').length || 0} Days
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button className="btn-icon" onClick={() => handleDelete(emp.employee_id)} title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>No records found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon }) => (
    <div className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ padding: '0.5rem', background: '#f3f4f6', borderRadius: '6px', color: '#4b5563' }}>{icon}</div>
        <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>{label}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1 }}>{value}</div>
        </div>
    </div>
);

export default Employees;
