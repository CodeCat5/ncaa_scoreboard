<?php

namespace Drupal\ncaa_scoreboard\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class ScoreboardController extends ControllerBase {

	// Main scoreboard
	public function content() {

		$build = array();

		$build['#type'] = 'markup';
		$build['#markup'] = $this->t('<div id="scoreboard"></div>');
		$build['#attached']['library'][] = 'ncaa_scoreboard/ncaa_scoreboard';

		return $build;
	}

	// Fetch the JSON
	public function json() {
		$json = json_decode(file_get_contents('http://ncaa-cssu.s3.amazonaws.com/webdev/coding-challenge/scoreboard.json'), true);
		return new JsonResponse($json);
	}
}