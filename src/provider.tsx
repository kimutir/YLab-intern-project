import React from "react";
import propTypes from "prop-types";
import Services from "./services";
import { types } from "@babel/core";

/**
 * Контекст для Services
 * @type {React.Context<{}>}
 */

interface IServicesContext {}

interface ServicesProviderProps {
  services: Services;
  children: React.ReactNode;
}

export const ServicesContext = React.createContext({} as Services);

/**
 * Провайдер Services.
 */
function ServicesProvider({ services, children }: ServicesProviderProps) {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
}

// ServicesProvider.propTypes = {
//   services: propTypes.object.isRequired,
//   children: propTypes.oneOfType([
//     propTypes.arrayOf(propTypes.node),
//     propTypes.node,
//   ]).isRequired,
// };

export default React.memo(ServicesProvider);
