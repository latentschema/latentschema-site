interface FnbPulseLogoProps {
  scale?: number
}

export default function FnbPulseLogo({ scale = 1 }: FnbPulseLogoProps) {
  return (
    <>
      <style>{`
        .fnb-logo-container {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          user-select: none;
        }
        .fnb-text {
          font-size: 17px;
          letter-spacing: -0.3px;
          color: #ffffff;
          display: flex;
          align-items: baseline;
        }
        .fnb-text .brand-fnb {
          font-style: italic;
          font-weight: 400;
          color: #ffffff;
          margin-right: 3px;
        }
        .fnb-text .brand-pulse {
          font-weight: 800;
          color: #00E676;
        }
        .fnb-text .brand-360-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          margin-left: 2px;
        }
        .fnb-text .brand-360-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50px;
          height: 50px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          overflow: visible;
        }
        .fnb-text .brand-360 {
          font-weight: 400;
          color: #ffffff;
          position: relative;
          z-index: 1;
          padding: 0 4px;
        }
      `}</style>
      <div className="fnb-logo-container" style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
        <div className="fnb-text">
          <span className="brand-fnb">fnb</span>
          <span className="brand-pulse">Pulse</span>
          <span className="brand-360-wrap">
            <svg className="brand-360-ring" viewBox="0 0 50 50">
              <path d="M 5.95 14 A 22 22 0 0 1 47 25" fill="none" stroke="#00E676" strokeWidth="3" strokeLinecap="round" />
              <path d="M 47 25 A 22 22 0 0 1 5.95 36" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <polygon points="2.95,30.8 8.55,34.5 3.35,37.5" fill="#ffffff" />
            </svg>
            <span className="brand-360">360</span>
          </span>
        </div>
      </div>
    </>
  )
}
