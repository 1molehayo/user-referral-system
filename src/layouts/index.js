import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import { PAGE_ANIMATION } from 'utility/constants';
import { Header } from './Header';
import { Footer } from './Footer';

const PageLayout = (props) => (
  <>
    {props.hasHeader && <Header />}

    <main className={classnames('page-body', props.className)}>
      <motion.div
        className="div"
        exit="out"
        initial="out"
        animate="in"
        variants={PAGE_ANIMATION.pageTransition}
        transition={PAGE_ANIMATION.duration}
      >
        {props.children}
      </motion.div>
    </main>

    <Footer />
  </>
);

PageLayout.propTypes = {
  children: PropTypes.node,
  hasHeader: PropTypes.bool,
  className: PropTypes.string
};

PageLayout.defaultProps = {
  hasHeader: true
};

export default PageLayout;
