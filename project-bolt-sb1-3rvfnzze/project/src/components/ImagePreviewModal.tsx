import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImagePreviewModalProps {
  image: string | null;
  alt: string;
  onClose: () => void;
}

export default function ImagePreviewModal({ image, alt, onClose }: ImagePreviewModalProps) {
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
    >
      <div className="relative max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <img src={image} alt={alt} className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white transition-colors hover:bg-black"
          aria-label="Close image preview"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}