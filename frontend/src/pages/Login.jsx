import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(formData.username, formData.password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
            <div className="w-full max-w-md bg-white dark:bg-card-dark rounded-2xl shadow-xl p-8 border border-divider-light dark:border-divider-dark">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
                        <Bot size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Welcome Back</h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">Sign in to your automation hub</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Username"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        error={error}
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-accent focus:ring-accent" />
                            <span className="text-text-secondary-light dark:text-text-secondary-dark">Remember me</span>
                        </label>
                        <a href="#" className="text-accent hover:text-accent-hover font-medium">Forgot password?</a>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <p className="text-center mt-6 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Don't have an account? <a href="#" className="text-accent hover:text-accent-hover font-medium">Contact Admin</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
