import React from 'react';
import { User, Key, Bell, Shield, Moon, Globe } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const SettingsSection = ({ title, icon: Icon, children }) => (
    <Card className="mb-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-divider-light dark:border-divider-dark">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <Icon size={20} />
            </div>
            <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">{title}</h2>
        </div>
        {children}
    </Card>
);

const Settings = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Settings</h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">Manage your account and application preferences</p>
            </div>

            <SettingsSection title="Profile Information" icon={User}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Full Name" defaultValue="Alex Johnson" />
                    <Input label="Email Address" defaultValue="alex@company.com" />
                    <div className="md:col-span-2">
                        <Button>Save Changes</Button>
                    </div>
                </div>
            </SettingsSection>

            <SettingsSection title="API Configuration" icon={Key}>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-divider-light dark:border-divider-dark">
                        <div>
                            <p className="font-medium text-text-primary-light dark:text-text-primary-dark">Production API Key</p>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-mono mt-1">pk_live_****************4x92</p>
                        </div>
                        <Button variant="secondary" className="text-sm h-9">Regenerate</Button>
                    </div>
                    <Button variant="ghost" className="text-accent pl-0 hover:bg-transparent hover:underline">
                        + Create New API Key
                    </Button>
                </div>
            </SettingsSection>

            <SettingsSection title="Preferences" icon={Globe}>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-text-primary-light dark:text-text-primary-dark">Log Retention</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">How long to keep execution logs</p>
                        </div>
                        <select className="h-10 rounded-lg border-divider-light dark:border-divider-dark bg-white dark:bg-card-dark text-text-primary-light dark:text-text-primary-dark px-3 focus:ring-2 focus:ring-accent/20 outline-none">
                            <option>30 Days</option>
                            <option>60 Days</option>
                            <option>90 Days</option>
                            <option>Forever</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-divider-light dark:border-divider-dark">
                        <div>
                            <p className="font-medium text-text-primary-light dark:text-text-primary-dark">Email Notifications</p>
                            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Receive daily summaries</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                        </label>
                    </div>
                </div>
            </SettingsSection>

            <div className="flex justify-end pt-4">
                <Button variant="danger" className="bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 border-none shadow-none">
                    Delete Account
                </Button>
            </div>
        </div>
    );
};

export default Settings;
