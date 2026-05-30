import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-service.component.html',
  styleUrl: './our-service.component.scss'
})
export class OurServiceComponent {
  categories = [
    { title: 'Sell printer', iconClass: 'bi-printer', action: 'sell' },
    { title: 'Rent printer', iconClass: 'bi-calendar-event', action: 'rent' },
    { title: 'Repair printer', iconClass: 'bi-tools', action: 'repair' },
    { title: 'Membership', iconClass: 'bi-shield-shaded', action: 'membership' }
  ];

  showMembershipModal = false;
  showContactDetails = false;

  // Membership packages structure
  memberships = [
    {
      duration: '1 Year Membership',
      price: '$99/yr',
      tier: 'Bronze Tier',
      icon: 'bi-patch-check',
      features: [
        'Free remote diagnostic setup support',
        '10% discount on printer spare parts',
        'Standard business hours response (24h)',
        '1 complimentary printhead cleaning service'
      ]
    },
    {
      duration: '2 Years Membership',
      price: '$179/2 yrs',
      tier: 'Silver Tier',
      icon: 'bi-patch-check-fill',
      features: [
        'Free remote + 1 annual onsite checkup',
        '15% discount on parts and toners',
        'Priority business hours response (12h)',
        '2 complimentary printhead cleaning services'
      ]
    },
    {
      duration: '3 Years Membership',
      price: '$249/3 yrs',
      tier: 'Gold Tier',
      icon: 'bi-award',
      features: [
        'Free remote + 2 annual onsite checkups',
        '20% discount on parts, toners, & accessories',
        'Fast response response guarantee (6h)',
        'Free temporary standby printer during repairs',
        '3 complimentary cleaning services'
      ]
    },
    {
      duration: '4 Years Membership',
      price: '$299/4 yrs',
      tier: 'Platinum Tier',
      icon: 'bi-gem',
      features: [
        'Free remote + unlimited onsite diagnostic visits',
        '25% discount on parts, toners, & accessories',
        'Ultra-fast priority response guarantee (3h)',
        'Free temporary standby printer during repairs',
        'Quarterly comprehensive cleaning & calibration'
      ]
    }
  ];

  constructor(private router: Router) {}

  handleServiceClick(cat: any) {
    if (cat.action === 'sell') {
      this.router.navigate(['/all-printers']);
    } else if (cat.action === 'rent') {
      this.router.navigate(['/all-printers'], { queryParams: { mode: 'rent' } });
    } else if (cat.action === 'repair') {
      this.router.navigate(['/repair-services']);
    } else if (cat.action === 'membership') {
      this.openMembershipModal();
    }
  }

  openMembershipModal() {
    this.showMembershipModal = true;
    this.showContactDetails = false;
    document.body.style.overflow = 'hidden';
  }

  closeMembershipModal() {
    this.showMembershipModal = false;
    document.body.style.overflow = 'auto';
  }

  contactMoreDetails() {
    this.showContactDetails = true;
  }
}
