interface AsciiDecorationProps {
  variant?: 'corners' | 'lines' | 'dots' | 'brackets';
  className?: string;
}

const AsciiDecoration = ({ variant = 'corners', className = '' }: AsciiDecorationProps) => {
  const decorations = {
    corners: (
      <>
        <span className="absolute -top-2 -left-2">┌</span>
        <span className="absolute -top-2 -right-2">┐</span>
        <span className="absolute -bottom-2 -left-2">└</span>
        <span className="absolute -bottom-2 -right-2">┘</span>
      </>
    ),
    lines: (
      <>
        <span className="absolute top-0 left-1/2 -translate-x-1/2">────────</span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2">────────</span>
      </>
    ),
    dots: (
      <>
        <span className="absolute -top-1 left-1/2 -translate-x-1/2">• • •</span>
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2">• • •</span>
      </>
    ),
    brackets: (
      <>
        <span className="absolute top-1/2 -left-4 -translate-y-1/2">[</span>
        <span className="absolute top-1/2 -right-4 -translate-y-1/2">]</span>
      </>
    ),
  };

  return (
    <div className={`ascii-decoration ${className}`}>
      {decorations[variant]}
    </div>
  );
};

export default AsciiDecoration;
