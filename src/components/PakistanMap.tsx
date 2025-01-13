import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { loadGeoJSON } from '../utils/loadGeoJSON';

interface TooltipContent {
  name: string;
  type: string;
}

const PakistanMap = () => {
  const [tooltipContent, setTooltipContent] = useState<TooltipContent | null>(null);
  const [boundaries, setBoundaries] = useState<{
    national?: any;
    provincial?: any;
    district?: any;
    tehsil?: any;
  }>({});

  useEffect(() => {
    const loadBoundaries = async () => {
      try {
        // Replace these paths with the actual paths to your GeoJSON files
        const national = await loadGeoJSON('/geojson/National_Boundary.json');
        const provincial = await loadGeoJSON('/geojson/Provincial_Boundary.json');
        const district = await loadGeoJSON('/geojson/District_Boundary.json');
        const tehsil = await loadGeoJSON('/geojson/Tehsil_Boundary.json');

        setBoundaries({
          national,
          provincial,
          district,
          tehsil
        });
      } catch (error) {
        console.error('Failed to load boundaries:', error);
      }
    };

    loadBoundaries();
  }, []);

  const getLayerStyle = (type: string) => {
    switch (type) {
      case 'national':
        return {
          default: {
            fill: "transparent",
            stroke: "#1D4ED8",
            strokeWidth: 2,
            outline: "none",
          },
          hover: {
            fill: "transparent",
            stroke: "#1D4ED8",
            strokeWidth: 2,
            outline: "none",
          }
        };
      case 'provincial':
        return {
          default: {
            fill: "#93C5FD",
            stroke: "#60A5FA",
            strokeWidth: 1,
            outline: "none",
          },
          hover: {
            fill: "#60A5FA",
            stroke: "#3B82F6",
            strokeWidth: 1,
            outline: "none",
          }
        };
      case 'district':
        return {
          default: {
            fill: "#C7D2FE",
            stroke: "#818CF8",
            strokeWidth: 0.5,
            outline: "none",
          },
          hover: {
            fill: "#818CF8",
            stroke: "#6366F1",
            strokeWidth: 0.5,
            outline: "none",
          }
        };
      case 'tehsil':
        return {
          default: {
            fill: "#E0E7FF",
            stroke: "#A5B4FC",
            strokeWidth: 0.25,
            outline: "none",
          },
          hover: {
            fill: "#A5B4FC",
            stroke: "#8B5CF6",
            strokeWidth: 0.25,
            outline: "none",
          }
        };
      default:
        return {};
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
      <div className="relative" style={{ height: "600px" }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 2500,
            center: [69, 30.5]
          }}
        >
          {/* Render each boundary layer */}
          {Object.entries(boundaries).map(([type, data]) => (
            data && (
              <Geographies key={type} geography={data}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent({
                          name: geo.properties.name,
                          type: type
                        });
                      }}
                      onMouseLeave={() => {
                        setTooltipContent(null);
                      }}
                      style={getLayerStyle(type)}
                    />
                  ))
                }
              </Geographies>
            )
          ))}
        </ComposableMap>
        
        {tooltipContent && (
          <div className="absolute bg-black text-white px-2 py-1 rounded text-sm pointer-events-none"
               style={{ left: "50%", bottom: "10px", transform: "translateX(-50%)" }}>
            {tooltipContent.name} ({tooltipContent.type})
          </div>
        )}
      </div>
    </div>
  );
};

export default PakistanMap;