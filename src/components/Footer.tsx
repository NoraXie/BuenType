import { useState } from 'react';
import { Github, Heart, Copy, X, QrCode, Coins } from 'lucide-react';
import supportQr from '../assets/wechat_qrcode.png';

export const Footer = () => {
    const [isDonationOpen, setIsDonationOpen] = useState(false);
    const [usdtCopied, setUsdtCopied] = useState(false);

    const handleCopyUsdt = () => {
        const address = "TCQ6dNXwu6u2EKV1ZN2CRmKRCFWR8Q5NzX";
        navigator.clipboard.writeText(address);
        setUsdtCopied(true);
        setTimeout(() => setUsdtCopied(false), 2000);
    };

    return (
        <footer className="w-full py-4 text-center mt-auto border-t border-soft-charcoal/5 bg-parchment flex items-center justify-center gap-6">
            <a
                href="https://github.com/NoraXie/BuenType"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-soft-charcoal/60 hover:text-soft-charcoal transition-colors text-sm uppercase tracking-widest font-black"
            >
                <Github size={18} />
                <span>GitHub</span>
            </a>

            <div className="h-4 w-px bg-soft-charcoal/20"></div>

            <button
                onClick={() => setIsDonationOpen(true)}
                className="flex items-center gap-2 text-soft-charcoal/60 hover:text-rose-500 transition-colors text-sm uppercase tracking-widest font-black"
            >
                <Heart size={18} />
                <span>Support</span>
            </button>

            {/* Donation Modal */}
            {isDonationOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full relative transform transition-all scale-100 border border-soft-charcoal/5">
                        <button
                            onClick={() => setIsDonationOpen(false)}
                            className="absolute top-4 right-4 text-soft-charcoal/40 hover:text-soft-charcoal transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center mb-6">
                            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-3">
                                <Heart size={24} fill="currentColor" />
                            </div>
                            <h3 className="text-xl font-bold text-soft-charcoal font-serif">Support BuenType</h3>
                            <p className="text-sm text-soft-charcoal/60 mt-1 text-center">Your support keeps the project alive!</p>
                        </div>

                        <div className="space-y-4">
                            {/* WeChat Pay */}
                            <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 flex flex-col items-center gap-3">
                                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                                    <QrCode size={16} />
                                    <span>WeChat Pay</span>
                                </div>
                                <div className="w-64 h-64 bg-white rounded-lg border border-emerald-100 flex items-center justify-center overflow-hidden shadow-sm">
                                    <img
                                        src={supportQr}
                                        alt="WeChat Pay QR Code"
                                        className="w-full h-full object-contain p-1"
                                    />
                                </div>
                            </div>

                            {/* USDT */}
                            <div className="bg-zinc-50 rounded-lg p-4 border border-zinc-200">
                                <div className="flex items-center gap-2 text-zinc-700 font-bold text-sm mb-2">
                                    <Coins size={16} />
                                    <span>USDT (TRC20)</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white rounded border border-zinc-200 p-2">
                                    <code className="text-[10px] text-zinc-500 font-mono flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                        TCQ6dNXwu6u2EKV1ZN2CRmKRCFWR8Q5NzX
                                    </code>
                                    <button
                                        onClick={handleCopyUsdt}
                                        className="text-zinc-400 hover:text-zinc-700 transition-colors"
                                        title="Copy Address"
                                    >
                                        {usdtCopied ? <span className="text-emerald-500 text-xs font-bold">Copied</span> : <Copy size={14} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setIsDonationOpen(false)}
                                className="text-sm text-soft-charcoal/40 hover:text-soft-charcoal underline underline-offset-4"
                            >
                                Maybe later
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
};
