'use client';

import { Check, Copy, Mail, Send, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

import { CONSTANTS } from '../../constants';

type ContactDrawerProps = {
  trigger: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
};

export function ContactDrawer({ trigger }: ContactDrawerProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(CONSTANTS.META.CONTACT_EMAIL);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = CONSTANTS.META.CONTACT_EMAIL;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, referralSource, message, website }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(
          data.error || `Could not send message. Please copy ${CONSTANTS.META.CONTACT_EMAIL} above.`
        );
        return;
      }

      setStatus('sent');
      setName('');
      setEmail('');
      setCompany('');
      setReferralSource('');
      setMessage('');
      setWebsite('');
    } catch {
      setStatus('error');
      setErrorMessage(`Network error. Please copy ${CONSTANTS.META.CONTACT_EMAIL} above and email us directly.`);
    }
  }

  function handleOpen() {
    setOpen(true);
    if (status === 'sent' || status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  }

  const triggerElement = React.cloneElement(trigger, {
    onClick: (event: React.MouseEvent) => {
      trigger.props.onClick?.(event);
      handleOpen();
    },
  });

  return (
    <>
      {triggerElement}

      {open ? (
        <div
          aria-labelledby='contact-drawer-title'
          aria-modal='true'
          className='fixed inset-0 z-50 flex justify-end'
          role='dialog'
        >
          <div
            aria-hidden='true'
            className='fixed inset-0 bg-black/50 backdrop-blur-[1px]'
            onClick={() => setOpen(false)}
          />

          <div className='relative z-10 flex h-full w-full max-w-md flex-col bg-white text-neutral-950 shadow-2xl overflow-y-auto'>
            <div className='flex items-center justify-between border-b border-neutral-200 px-6 py-4'>
              <h3 className='text-xl font-bold' id='contact-drawer-title'>
                Contact UtahDevCo
              </h3>
              <button
                aria-label='Close contact drawer'
                className='rounded-md p-1.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 cursor-pointer'
                onClick={() => setOpen(false)}
                type='button'
              >
                <X className='h-5 w-5' />
              </button>
            </div>

            <div className='flex flex-col gap-6 p-6'>
              <div className='flex flex-col gap-2 rounded-md border border-neutral-200 bg-neutral-50 p-4'>
                <span className='text-xs font-medium uppercase tracking-wide text-neutral-500'>Direct email</span>
                <div className='flex items-center justify-between gap-2'>
                  <span className='font-mono text-sm sm:text-base font-medium text-neutral-900 select-all'>
                    {CONSTANTS.META.CONTACT_EMAIL}
                  </span>
                  <Button
                    className='gap-1.5 cursor-pointer shrink-0'
                    onClick={handleCopyEmail}
                    size='sm'
                    type='button'
                    variant='outline'
                  >
                    {copied ? (
                      <>
                        <Check className='h-4 w-4 text-green-600' />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className='h-4 w-4' />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <a
                  className='inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-950 w-fit mt-1'
                  href={CONSTANTS.META.CONTACT_URL}
                >
                  <Mail className='h-3.5 w-3.5' />
                  Open in your email app
                </a>
              </div>

              <div className='flex items-center gap-3 text-xs uppercase tracking-wide text-neutral-400'>
                <div className='h-px flex-1 bg-neutral-200' />
                <span>Or send a message</span>
                <div className='h-px flex-1 bg-neutral-200' />
              </div>

              {status === 'sent' ? (
                <div className='flex flex-col gap-4 rounded-md border border-green-200 bg-green-50 p-5 text-green-950'>
                  <p className='font-semibold'>Message sent.</p>
                  <p className='text-sm'>Thanks for reaching out. We&apos;ll reply to your email shortly.</p>
                  <div className='flex gap-2'>
                    <Button
                      className='cursor-pointer'
                      onClick={() => setStatus('idle')}
                      size='sm'
                      type='button'
                      variant='outline'
                    >
                      Send another
                    </Button>
                    <Button className='cursor-pointer' onClick={() => setOpen(false)} size='sm' type='button'>
                      Done
                    </Button>
                  </div>
                </div>
              ) : (
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                  <div className='flex flex-col gap-1.5'>
                    <label className='text-sm font-medium text-neutral-800' htmlFor='contact-name'>
                      Name
                    </label>
                    <input
                      autoComplete='name'
                      className='rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-hidden'
                      id='contact-name'
                      maxLength={120}
                      name='name'
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Your name'
                      required
                      type='text'
                      value={name}
                    />
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label className='text-sm font-medium text-neutral-800' htmlFor='contact-email'>
                      Email
                    </label>
                    <input
                      autoComplete='email'
                      className='rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-hidden'
                      id='contact-email'
                      maxLength={254}
                      name='email'
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='you@company.com'
                      required
                      type='email'
                      value={email}
                    />
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label className='text-sm font-medium text-neutral-800' htmlFor='contact-company'>
                      Company <span className='font-normal text-neutral-400'>(optional)</span>
                    </label>
                    <input
                      autoComplete='organization'
                      className='rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-hidden'
                      id='contact-company'
                      maxLength={120}
                      name='company'
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder='Company name'
                      type='text'
                      value={company}
                    />
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label className='text-sm font-medium text-neutral-800' htmlFor='contact-referral'>
                      How did you hear about us? <span className='font-normal text-neutral-400'>(optional)</span>
                    </label>
                    <select
                      className='rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-hidden'
                      id='contact-referral'
                      name='referralSource'
                      onChange={(e) => setReferralSource(e.target.value)}
                      value={referralSource}
                    >
                      <option value=''>Select one...</option>
                      <option value='ChatGPT / Claude / Perplexity (AI Search)'>
                        ChatGPT / Claude / Perplexity (AI Search)
                      </option>
                      <option value='Google Search'>Google Search</option>
                      <option value='Referral / Word of Mouth'>Referral / Word of Mouth</option>
                      <option value='Chris Esplin (YouTube / Website)'>Chris Esplin (YouTube / Website)</option>
                      <option value='LinkedIn / Social'>LinkedIn / Social</option>
                      <option value='Other'>Other</option>
                    </select>
                  </div>

                  <div className='flex flex-col gap-1.5'>
                    <label className='text-sm font-medium text-neutral-800' htmlFor='contact-message'>
                      What manual process is costing your team the most time?
                    </label>
                    <textarea
                      className='min-h-[120px] rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-hidden'
                      id='contact-message'
                      maxLength={5000}
                      name='message'
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder='Tell us about the spreadsheets, data entry, invoicing, or software glue slowing your office down...'
                      required
                      value={message}
                    />
                  </div>

                  <input
                    aria-hidden='true'
                    autoComplete='off'
                    className='hidden'
                    name='website'
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    type='text'
                    value={website}
                  />

                  {status === 'error' ? (
                    <p className='rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800' role='alert'>
                      {errorMessage}
                    </p>
                  ) : null}

                  <Button
                    className='w-full gap-2 cursor-pointer'
                    disabled={status === 'submitting'}
                    type='submit'
                    variant='default'
                  >
                    <Send className='h-4 w-4' />
                    {status === 'submitting' ? 'Sending...' : 'Send message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
