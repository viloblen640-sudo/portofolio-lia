const B = ({ bg, t }) => <svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill={bg} /><text x="12" y="17.5" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="Arial">{t}</text></svg>;
export const PowerBI = () => <svg viewBox="0 0 24 24"><rect x="3" y="13" width="4.5" height="8" rx="1.2" fill="#B07A00" /><rect x="9.8" y="8" width="4.5" height="13" rx="1.2" fill="#E6A800" /><rect x="16.5" y="3" width="4.5" height="18" rx="1.2" fill="#F2C811" /></svg>;
export const Office = () => <svg viewBox="0 0 24 24"><path d="M3 7.5 14 2l7 3v14l-7 3-11-4.5z" fill="#EA3E23" /><path d="M14 2v20l7-3V5z" fill="#FF7A45" /><path d="M3 7.5 8 6v12l-5-1.5z" fill="#B7260F" /></svg>;
export const Word = () => <B bg="#2B7CD3" t="W" />;
export const Excel = () => <B bg="#1D8A57" t="X" />;
export const PowerPoint = () => <B bg="#D35230" t="P" />;
