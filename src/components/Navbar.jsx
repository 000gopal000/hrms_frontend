import { Link, useLocation } from 'react-router-dom';
import { Hexagon, Bell } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <header style={{
            background: '#0f172a',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            width: '100%'
        }}>
            <div style={{ width: '100%', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ color: '#3b82f6', display: 'flex' }}>
                        <Hexagon size={28} fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#f8fafc', letterSpacing: '-0.025em' }}>HRMS <span style={{ opacity: 0.5, fontWeight: 400 }}>Lite</span></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>

                    <nav style={{ display: 'flex', gap: '0.25rem' }}>
                        <NavLink to="/" label="Dashboard" active={isActive('/')} />
                        <NavLink to="/attendance" label="Attendance" active={isActive('/attendance')} />
                    </nav>

                    <div style={{ width: '1px', height: '24px', background: '#334155' }}></div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>

                        <div style={{ position: 'relative' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.5rem', display: 'flex' }} title="Notifications">
                                <Bell size={20} />
                            </button>
                            <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid #0f172a' }}></span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', background: '#1e293b', padding: '0.375rem 0.5rem 0.375rem 1rem', borderRadius: '999px', border: '1px solid #334155' }}>
                        <div style={{ textAlign: 'right', lineHeight: 1.2 }}>
                            <div style={{ fontSize: '0.75rem', color: '#f1f5f9', fontWeight: 600 }}>Admin</div>
                        </div>
                        <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', color: 'white' }}>
                            AD
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

const NavLink = ({ to, label, active }) => (
    <Link to={to} style={{
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: active ? '#ffffff' : '#94a3b8',
        background: active ? '#334155' : 'transparent',
        transition: 'all 0.2s',
    }}>
        {label}
    </Link>
);

export default Navbar;
