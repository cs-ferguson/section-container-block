<?php
/**
 * Plugin Name: section-container-block
 * Plugin URI: https://github.com/cs-ferguson/section-container-block
 * Description: A simple section container block
 * Author: Chris Ferguson
 * Author URI: https://github.com/cs-ferguson/
 * Version: 1.0.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'init.php';
