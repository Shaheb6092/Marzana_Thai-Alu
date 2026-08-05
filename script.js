// JavaScript Logic for Marzana Thai Aluminium Glass & Hardware Website

document.addEventListener('DOMContentLoaded', () => {
            // 1. Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');

            if (mobileMenuBtn && mobileMenu) {
                mobileMenuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });

                // Close mobile menu when clicking a link
                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.add('hidden');
                    });
                });
            }

            // 2. Sticky Navbar Glass Effect on Scroll
            const header = document.getElementById('main-header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('shadow-xl', 'bg-slate-900/95');
                    header.classList.remove('bg-slate-900/80');
                } else {
                    header.classList.remove('shadow-xl');
                    header.classList.add('bg-slate-900/80');
                }
            });

            // 3. Service Filter Tabs (if applicable in portfolio gallery)
            const filterBtns = document.querySelectorAll('.gallery-filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => {
                        b.classList.remove('bg-blue-600', 'text-white');
                        b.classList.add('bg-slate-200', 'text-slate-700');
                    });
                    // Add active class to clicked button
                    btn.classList.remove('bg-slate-200', 'text-slate-700');
                    btn.classList.add('bg-blue-600', 'text-white');

                    const category = btn.getAttribute('data-category');

                    galleryItems.forEach(item => {
                        if (category === 'all' || item.getAttribute('data-category') === category) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    });
                });
            });

            // 4. Booking Form Handling
            const bookingForm = document.getElementById('booking-form');
            const bookingModal = document.getElementById('booking-modal');
            const openBookingModalBtn = document.getElementById('open-booking-modal');
            const closeModalBtn = document.getElementById('close-modal-btn');
            const bookingDetailsSummary = document.getElementById('booking-details-summary');

            if (openBookingModalBtn && bookingModal) {
                openBookingModalBtn.addEventListener('click', () => {
                    bookingModal.classList.remove('hidden');
                    bookingModal.classList.add('flex');
                });
            }

            const bookingOpenTriggers = document.querySelectorAll('.booking-open-trigger');
            if (bookingOpenTriggers.length && bookingModal) {
                bookingOpenTriggers.forEach(trigger => {
                    trigger.addEventListener('click', (event) => {
                        event.preventDefault();
                        bookingModal.classList.remove('hidden');
                        bookingModal.classList.add('flex');
                    });
                });
            }

            if (bookingModal) {
                bookingModal.addEventListener('click', (event) => {
                    if (event.target === bookingModal) {
                        bookingModal.classList.add('hidden');
                        bookingModal.classList.remove('flex');
                    }
                });
            }

            if (bookingForm) {
                bookingForm.addEventListener('submit', async(e) => {
                            e.preventDefault();

                            const name = document.getElementById('booking-name').value.trim();
                            const phone = document.getElementById('booking-phone').value.trim();
                            const service = document.getElementById('booking-service').value;
                            const date = document.getElementById('booking-date').value;
                            const notes = document.getElementById('booking-notes') ? document.getElementById('booking-notes').value.trim() : '';
                            const submitButton = bookingForm.querySelector('button[type="submit"]');

                            if (!name || !phone || !service || !date) {
                                alert('অনুগ্রহ করে সব তথ্য সঠিকভাবে পূরণ করুন! (Please fill out all required fields)');
                                return;
                            }

                            if (submitButton) {
                                submitButton.disabled = true;
                                submitButton.textContent = 'পাঠানো হচ্ছে...';
                            }

                            try {
                                const response = await fetch(bookingForm.action, {
                                    method: 'POST',
                                    body: new FormData(bookingForm),
                                    mode: 'cors'
                                });

                                const data = await response.json();

                                if (!response.ok || !data.success) {
                                    throw new Error(data.message || 'Booking submission failed');
                                }

                                if (bookingDetailsSummary) {
                                    bookingDetailsSummary.classList.remove('hidden');
                                    bookingDetailsSummary.innerHTML = `
                                <div class="text-left bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-slate-900">
                                    <p><strong>গ্রাহকের নাম:</strong> ${escapeHtml(name)}</p>
                                    <p><strong>মোবাইল নম্বর:</strong> ${escapeHtml(phone)}</p>
                                    <p><strong>সেবার ধরণ:</strong> ${escapeHtml(service)}</p>
                                    <p><strong>তারিখ:</strong> ${escapeHtml(date)}</p>
                                    ${notes ? `<p><strong>বিবরণ:</strong> ${escapeHtml(notes)}</p>` : ''}
                                    <p class="text-green-700 font-semibold">আপনার বুকিং সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করবো।</p>
                                </div>
                            `;
                        }

                        alert(`✅ বুকিং নিশ্চিতকরণ:\nধন্যবাদ ${name}!\nআপনার বুকিং প্রস্তাবনাটি সফলভাবে পাঠানো হয়েছে।\nআমাদের প্রতিনিধি শীঘ্রই ০১৭-২৯১৩৪১৫৫ থেকে আপনার সাথে কথা বলবেন।`);
                        bookingForm.reset();
                    } catch (error) {
                        console.error('Booking submission error:', error);
                        alert('দুঃখিত, বুকিং পাঠানো যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন বা সরাসরি ফোন/হোয়াটসঅ্যাপে যোগাযোগ করুন।');
                    } finally {
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = 'এখনই বুকিং করুন';
                        }
                    }
                });
            }

    // 4.1 Hero Quick Booking Form Handling
    const heroBookingForm = document.getElementById('hero-booking-form');
    if (heroBookingForm) {
        heroBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('hero-booking-name').value.trim();
            const phone = document.getElementById('hero-booking-phone').value.trim();
            const service = document.getElementById('hero-booking-service').value;
            const date = document.getElementById('hero-booking-date').value;
            const address = document.getElementById('hero-booking-address') ? document.getElementById('hero-booking-address').value.trim() : '';

            if (!name || !phone || !service || !date) {
                alert('অনুগ্রহ করে সব প্রয়োজনীয় তথ্য পূরণ করুন!');
                return;
            }

            alert(`✅ ফ্রি বুকিং নিশ্চিতকরণ:\nধন্যবাদ ${name}!\nআপনার পরিদর্শনের প্রস্তাবনা সফলভাবে গৃহীত হয়েছে।\nসেবার ধরণ: ${service}\nতারিখ: ${date}${address ? `\nঠিকানা: ${address}` : ''}\nআমাদের প্রতিনিধি শীঘ্রই ০১৭-২৯১৩৪১৫৫ নম্বর থেকে কল করবেন।`);

            heroBookingForm.reset();
        });
    }

    const contactForm = document.getElementById('contact-form');
    const contactFormStatus = document.getElementById('contact-form-status');

    if (contactForm && contactFormStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const phone = contactForm.querySelector('input[name="phone"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();

            if (!name || !phone || !message) {
                updateContactStatus('error', 'অনুগ্রহ করে নাম, ফোন নম্বর এবং বার্তা সহ সব বাধ্যতামূলক তথ্য পূরণ করুন।');
                return;
            }

            updateContactStatus('loading', 'আপনার বার্তা পাঠানো হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...');

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    mode: 'cors'
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    updateContactStatus('success', 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।');
                    contactForm.reset();
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (error) {
                console.error('Contact form submission error:', error);
                updateContactStatus('error', 'দুঃখিত, বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন বা সরাসরি ফোন/হোয়াটসঅ্যাপ করুন।');
            }
        });
    }

    function updateContactStatus(type, message) {
        contactFormStatus.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-900', 'border', 'border-emerald-200', 'bg-red-50', 'text-red-900', 'border-red-200', 'bg-slate-100', 'text-slate-700', 'border-slate-200');

        if (type === 'success') {
            contactFormStatus.classList.add('bg-emerald-50', 'text-emerald-900', 'border', 'border-emerald-200');
        } else if (type === 'error') {
            contactFormStatus.classList.add('bg-red-50', 'text-red-900', 'border', 'border-red-200');
        } else {
            contactFormStatus.classList.add('bg-slate-100', 'text-slate-700', 'border', 'border-slate-200');
        }

        contactFormStatus.textContent = message;
    }

    if (closeModalBtn && bookingModal) {
        closeModalBtn.addEventListener('click', () => {
            bookingModal.classList.add('hidden');
            bookingModal.classList.remove('flex');
        });
    }

    // Helper HTML Escaper
    function escapeHtml(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});