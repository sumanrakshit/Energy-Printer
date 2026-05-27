import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

function passwordMatchValidator(form: AbstractControl) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    }, { validators: passwordMatchValidator });
  }

  get fullName() { return this.registerForm.get('fullName')!; }
  get email() { return this.registerForm.get('email')!; }
  get phone() { return this.registerForm.get('phone')!; }
  get password() { return this.registerForm.get('password')!; }
  get confirmPassword() { return this.registerForm.get('confirmPassword')!; }
  get agreeTerms() { return this.registerForm.get('agreeTerms')!; }

  getPasswordStrength(): { label: string; class: string; width: string } {
    const pwd = this.password.value || '';
    if (pwd.length === 0) return { label: '', class: '', width: '0%' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { label: 'Weak', class: 'bg-danger', width: '25%' };
    if (score === 2) return { label: 'Fair', class: 'bg-warning', width: '50%' };
    if (score === 3) return { label: 'Good', class: 'bg-info', width: '75%' };
    return { label: 'Strong', class: 'bg-success', width: '100%' };
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
  toggleConfirmPassword(): void { this.showConfirmPassword = !this.showConfirmPassword; }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Backend-ready payload — wire to HTTP when API is ready
    const payload = {
      fullName: this.fullName.value,
      email: this.email.value,
      phone: this.phone.value,
      password: this.password.value
    };

    console.log('Register payload ready for backend:', payload);

    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = 'Account created successfully! Redirecting to login...';
      setTimeout(() => this.router.navigate(['/auth/login']), 1800);
    }, 1400);
  }
}
