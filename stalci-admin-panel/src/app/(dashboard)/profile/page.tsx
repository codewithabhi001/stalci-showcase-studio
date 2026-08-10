"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { fetchProfile, updateProfile } from "@/lib/api";

export default function ProfilePage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.name || "",
        email: profile.email || ""
      }));
    }
  }, [profile]);

  const updateMut = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast({ title: "Profile updated", description: "Your details have been saved successfully.", variant: "success" });
      setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update profile.", variant: "error" });
    }
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateMut.mutate({ name: formData.name, email: formData.email });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({ title: "Passwords don't match", description: "Please ensure your new passwords match.", variant: "error" });
      return;
    }
    updateMut.mutate({ password: formData.newPassword, currentPassword: formData.currentPassword });
  };

  if (isLoading) return null;

  return (
    <div className="animate-fade-up space-y-8 max-w-3xl">
      <div>
        <p className="eyebrow">Account</p>
        <h1 className="mt-1.5 text-[26px] font-semibold leading-tight text-ink">My Profile</h1>
        <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-muted">
          Manage your personal information and security settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h2 className="text-[14px] font-semibold text-ink">Personal Information</h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
            Update your basic profile information and email address.
          </p>
        </div>
        
        <div className="card md:col-span-2">
          <form onSubmit={handleSaveProfile} className="p-6 space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-[13px] font-semibold text-ink-2">Full Name</label>
              <input 
                id="name" 
                type="text" 
                required 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="field" 
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-ink-2">Email Address</label>
              <input 
                id="email" 
                type="email" 
                required 
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="field" 
              />
            </div>
            
            <div className="pt-2 flex justify-end">
              <Button type="submit" loading={updateMut.isPending}>Save Profile</Button>
            </div>
          </form>
        </div>
      </div>

      <div className="h-px w-full bg-line" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h2 className="text-[14px] font-semibold text-ink">Security</h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>
        
        <div className="card md:col-span-2">
          <form onSubmit={handleUpdatePassword} className="p-6 space-y-5">
            <div>
              <label htmlFor="currentPassword" className="mb-1.5 block text-[13px] font-semibold text-ink-2">Current Password</label>
              <input 
                id="currentPassword" 
                type="password" 
                required
                value={formData.currentPassword}
                onChange={e => setFormData({ ...formData, currentPassword: e.target.value })}
                className="field" 
              />
            </div>
            
            <div className="h-4" />
            
            <div>
              <label htmlFor="newPassword" className="mb-1.5 block text-[13px] font-semibold text-ink-2">New Password</label>
              <input 
                id="newPassword" 
                type="password" 
                required
                minLength={8}
                value={formData.newPassword}
                onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
                className="field" 
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-[13px] font-semibold text-ink-2">Confirm New Password</label>
              <input 
                id="confirmPassword" 
                type="password" 
                required
                minLength={8}
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="field" 
              />
            </div>
            
            <div className="pt-2 flex justify-end">
              <Button type="submit" loading={updateMut.isPending} disabled={!formData.currentPassword || !formData.newPassword}>
                Update Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
